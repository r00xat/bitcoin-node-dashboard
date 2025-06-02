# Bitcoin Node Dashboard
![GitHub Tag](https://img.shields.io/github/v/tag/montejojorge/bitcoin-node-dashboard)
![Docker Image Size (tag)](https://img.shields.io/docker/image-size/montejojorge/bitcoin-node-dashboard/latest)
![Static Badge](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Bitcoin Node Dashboard is a dashboard to see info about your Bitcoin Node.

**This fork removes the weblogin.**

> [!NOTE]
> **Changed or deleted files**
>        modified:   backend/src/Server.js
>        deleted:    backend/src/middlewares/auth.js
>        deleted:    backend/src/routes/auth.js
>        modified:   frontend/src/App.tsx
>        modified:   frontend/src/components/NavBar.tsx
>        modified:   frontend/src/store/api/api.ts
>        modified:   frontend/src/store/userStore.ts
>        deleted:    frontend/src/utils/auth.ts
>        deleted:    frontend/src/views/Login.tsx

![image](https://github.com/user-attachments/assets/d7dc4e30-7f24-4730-a7e7-7e0c86a5db26)

## Create your own docker image
```
git clone https://github.com/r00xat/bitcoin-node-dashboard.git		
docker build -t bitcoin-node-dashboard:own .
```

## Usage
```yml
services:
   bnd:
      image: bitcoin-node-dashboard:own # Use your own docker image!
      container_name: bnd
      ports:
         - 1100:1101
      volumes:
         - /absolute-path-to-your-docker-folder/backup-stats:/data
         - /absolute-path-to-your-node/bitcoin:/root/.bitcoin:ro
      environment:
         BTC_HOST: 192.168.1.10
         BTC_PORT: 8332
         BITCOIND_DIR: /root/.bitcoin # Or you can use user/pass auth
         BTC_USERNAME: your-rpc-usern
         BTC_PASSWORD: your-rpc-password
      restart: unless-stopped
```
