# Test

```bash
# 1. cd to this directory
cd /~/tri-file-storage-server/cli
# 2. link with npm
sudo npm link
# 3. run commands with fs-store command
fs-store
# 5. unlink to this package
sudo npm unlink
```

# Example Commands Using Server

```bash
fs-store --help
fs-store --list
fs-store --delete --name redis.png
fs-store --upload --path /home/kwa/Downloads/redis.png
```

# Example Commands on Local Fileserver

```bash
fs-store --help
fs-store --local_list
fs-store --local_delete --name redis.png
fs-store --local_upload --path /home/kwa/Downloads/redis.png
```