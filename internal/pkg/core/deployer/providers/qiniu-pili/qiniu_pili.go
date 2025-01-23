﻿package qiniupili

import (
	"context"
	"errors"

	xerrors "github.com/pkg/errors"
	"github.com/qiniu/go-sdk/v7/pili"

	"github.com/usual2970/certimate/internal/pkg/core/deployer"
	"github.com/usual2970/certimate/internal/pkg/core/logger"
	"github.com/usual2970/certimate/internal/pkg/core/uploader"
	uploaderp "github.com/usual2970/certimate/internal/pkg/core/uploader/providers/qiniu-sslcert"
)

type QiniuPiliDeployerConfig struct {
	// 七牛云 AccessKey。
	AccessKey string `json:"accessKey"`
	// 七牛云 SecretKey。
	SecretKey string `json:"secretKey"`
	// 直播空间名。
	Hub string `json:"hub"`
	// 直播流域名（不支持泛域名）。
	Domain string `json:"domain"`
}

type QiniuPiliDeployer struct {
	config      *QiniuPiliDeployerConfig
	logger      logger.Logger
	sdkClient   *pili.Manager
	sslUploader uploader.Uploader
}

var _ deployer.Deployer = (*QiniuPiliDeployer)(nil)

func New(config *QiniuPiliDeployerConfig) (*QiniuPiliDeployer, error) {
	return NewWithLogger(config, logger.NewNilLogger())
}

func NewWithLogger(config *QiniuPiliDeployerConfig, logger logger.Logger) (*QiniuPiliDeployer, error) {
	if config == nil {
		return nil, errors.New("config is nil")
	}

	if logger == nil {
		return nil, errors.New("logger is nil")
	}

	manager := pili.NewManager(pili.ManagerConfig{AccessKey: config.AccessKey, SecretKey: config.SecretKey})

	uploader, err := uploaderp.New(&uploaderp.QiniuSSLCertUploaderConfig{
		AccessKey: config.AccessKey,
		SecretKey: config.SecretKey,
	})
	if err != nil {
		return nil, xerrors.Wrap(err, "failed to create ssl uploader")
	}

	return &QiniuPiliDeployer{
		logger:      logger,
		config:      config,
		sdkClient:   manager,
		sslUploader: uploader,
	}, nil
}

func (d *QiniuPiliDeployer) Deploy(ctx context.Context, certPem string, privkeyPem string) (*deployer.DeployResult, error) {
	// 上传证书到 CDN
	upres, err := d.sslUploader.Upload(ctx, certPem, privkeyPem)
	if err != nil {
		return nil, xerrors.Wrap(err, "failed to upload certificate file")
	}

	d.logger.Logt("certificate file uploaded", upres)

	// 修改域名证书配置
	// REF: https://developer.qiniu.com/pili/9910/pili-service-sdk#66
	setDomainCertReq := pili.SetDomainCertRequest{
		Hub:      d.config.Hub,
		Domain:   d.config.Domain,
		CertName: upres.CertName,
	}
	err = d.sdkClient.SetDomainCert(context.TODO(), setDomainCertReq)
	if err != nil {
		return nil, xerrors.Wrap(err, "failed to execute sdk request 'pili.SetDomainCert'")
	}

	d.logger.Logt("已修改域名证书配置")

	return &deployer.DeployResult{}, nil
}
