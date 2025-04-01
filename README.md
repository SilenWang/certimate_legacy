中文(README.md) ｜ [English](README_EN.md)

> [!WARNING]
> 本项目仅编译Certimate的Win7兼容版本，并未执行任何单元测试，不保证所有原版功能均可用
> Fork的方式不能很好完成项目设立支出的追踪源项目自动发布的目的，因此放弃本项目，开设单独的项目[专门维护一个workflow](https://github.com/SilenWang/certimate_win7)

# Certimate-Legacy

本项目是[Certimate](https://github.com/usual2970/certimate)工具的fork。

Certimate是非常好用的自动证书部署工具，但是其依赖go 1.23及以上的版本，而go从1.21开始就不再支持Win7/Win Server 2008这种老系统，因此官方Release并不能在这些系统上使用。而我公司的服务器就是老掉牙的系统，且只有RDP协议，也不方便开其他的服务来接收部署的证书。

因此，本项目旨在使用第三方的[Win7兼容版go](https://github.com/XTLS/go-win7)编译Certimate，生成Win下的可执行程序。

## Todo

- [x] 编写初版Release Workflow
- [ ] 修改Workflow以分别打包v2和v3的最新发布版
- [ ] 修改Workflow以追踪原代码库发布，生成相应的兼容版本