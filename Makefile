# Makefile

# 默认值，如果不传参数则使用这些值
VERSION ?= latest
DOCKER_PASSWORD ?= your_password_here

# 定义目标
.PHONY: all build login push clean

# 构建项目
build:
	@echo "Installing dependencies..."
	npm install
	@echo "Building project..."
	npm run build
	@echo "Build completed successfully!"

# 登录到 Docker Registry
login:
	@echo "Logging into Docker Registry..."
	echo $(DOCKER_PASSWORD) | docker login --username=amuguelove1991 --password-stdin registry.cn-chengdu.aliyuncs.com

# 构建 Docker 镜像
docker-build:
	docker build -t registry.cn-chengdu.aliyuncs.com/flyeric/md:$(VERSION) .

# 推送镜像到 Docker Registry
docker-push:
	docker push registry.cn-chengdu.aliyuncs.com/flyeric/md:$(VERSION)

# 一键运行所有步骤
all: build login docker-build docker-push
	@echo "All steps completed successfully!"

# 清理构建文件
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	# rm -rf node_modules
	@echo "Clean completed successfully!"

