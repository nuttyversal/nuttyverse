# Nuttyverse Ops

## Deploy

```shell
# Build and switch system configuration.
sudo nixos-rebuild switch --flake ./ops
```

## Secrets

```shell
# Enter Nix shell.
nix develop

# Edit secrets.
cd ops/cloud/secrets
agenix -e <secret-name>.age

# Generate passwords.
openssl rand -base64 32
```
