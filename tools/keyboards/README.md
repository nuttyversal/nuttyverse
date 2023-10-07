# KMonad

[Install the DriverKit extension (dext)](https://github.com/kmonad/kmonad/blob/master/doc/installation.md#installing-the-dext) in order for KMonad to post key events to macOS.

```bash
# Enter Nix shell and run KMonad...
nix develop
sudo kmonad ./macos.kbd

# ...or directly run KMonad.
sudo nix run . -- ./macos.kbd
```
