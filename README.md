# Getting Started

1. Fork or clone the repository to your machine
2. If cloned, rename the remote with `git remote rename origin boilerplate`

1. Run the app via CLI with `cd KDG.Boilerplate.Server && dotnet watch run`
> This will install all required server and client dependencies

2. Your browser should open automatically, otherwise. If it doesn't, manucally navigate to https://localhost:5173

# Staying up to date

This boilerplate is designed to be both a starting point and an ever-evolving foundation for your .NET/React applications.

In order to extract the most value from this boilerplate, it is important to keep your application up to date frequently reintegrating into your application with one of the applicable workflows:

## Cloned Repositories
- Run `git pull --rebase [branch] boilerplate`
## Forked Repositories
- Create a pull request from this repository into your fork

# Contributing

Pull requests are welcome and very much appreciated!

## Testing changes locally
1. Add the path to your local package build via .csproj
```
<PropertyGroup>
    <RestoreSources>$(RestoreSources);https://api.nuget.org/v3/index.json;..\..\path-to-your-builds</RestoreSources>
</PropertyGroup>
```
2. Clear nuget caches with `dotnet nuget locals all --clear`
3. Restore with `dotnet restore`
> you might add `--no-cache` for good measure