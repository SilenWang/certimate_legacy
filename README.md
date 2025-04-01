<h1 align="center">🔒 Certimate</h1>

<div align="center">

[![Stars](https://img.shields.io/github/stars/usual2970/certimate?style=flat)](https://github.com/usual2970/certimate)
[![Forks](https://img.shields.io/github/forks/usual2970/certimate?style=flat)](https://github.com/usual2970/certimate)
[![Docker Pulls](https://img.shields.io/docker/pulls/usual2970/certimate?style=flat)](https://hub.docker.com/r/usual2970/certimate)
[![Release](https://img.shields.io/github/v/release/usual2970/certimate?sort=semver)](https://github.com/usual2970/certimate/releases)
[![License](https://img.shields.io/github/license/usual2970/certimate)](https://mit-license.org/)

</div>

<div align="center">

中文 ｜ [English](README_EN.md)

> [!WARNING]
> 本项目仅编译Certimate的Win7兼容版本，并未执行任何单元测试，不保证所有原版功能均可用

# Certimate-Win7

本项目是[Certimate](https://github.com/usual2970/certimate)工具的fork。

Certimate是非常好用的自动证书部署工具，但是其依赖go 1.23及以上的版本，而go从1.21开始就不再支持Win7/Win Server 2008这种老系统，因此官方Release并不能在这些系统上使用。而我公司的服务器就是老掉牙的系统，且只有RDP协议，也不方便开其他的服务来接收部署的证书。

因此，本项目旨在使用第三方的[Win7兼容版go](https://github.com/XTLS/go-win7)编译Certimate，生成Win下的可执行程序。

## Todo

- [x] 编写初版Release Workflow
- [ ] 修改Workflow以分别打包v2和v3的最新发布版
- [ ] 修改Workflow以追踪原代码库发布，生成相应的兼容版本