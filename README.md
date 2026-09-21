# NotaryCore

A system for managing and automating notarial processes.

## Objectives

* Manage individuals and legal entities
* Manage notarial protocols
* Register notarial acts
* Associate parties with acts
* Automate document drafting
* Reduce manual work for notary staff

## Tech Stack

### Backend

* C#
* .NET
* ASP.NET Core
* Entity Framework Core

### Database

* PostgreSQL

### Frontend

* TypeScript
* React

## Project Structure

```text
NotaryCore/
├── .gitignore
├── README.md
├── NotaryCore.slnx
│
└── src/
    ├── NotaryCore.Api/
    │   ├── Data/
    │   │   └── NotaryCoreDbContext.cs
    │   │
    │   ├── Endpoints/
    │   │   ├── ActEndpoints.cs
    │   │   ├── PersonEndpoints.cs
    │   │   └── ProtocolsEndpoints.cs
    │   │
    │   ├── Migrations/
    │   │   ├── 20260831131026_AddProtocol.cs
    │   │   ├── 20260831131026_AddProtocol.Designer.cs
    │   │   ├── 20260831234930_AddAct.cs
    │   │   ├── 20260831234930_AddAct.Designer.cs
    │   │   └── NotarycoreDbContextModelSnapshot.cs
    │   │
    │   ├── Properties/
    │   │   └── launchSettings.json
    │   │
    │   ├── NotaryCore.Api.csproj
    │   ├── NotaryCore.Api.http
    │   ├── Program.cs
    │   ├── appsettings.json
    │   └── appsettings.Development.json
    │
    ├── NotaryCore.Cli/
    │   ├── NotaryCore.Cli.csproj
    │   └── Program.cs
    │
    ├── NotaryCore.Domain/
    │   ├── Entities/
    │   │   ├── Acts.cs
    │   │   ├── Acts_parts.cs
    │   │   ├── Persons.cs
    │   │   ├── Property.cs
    │   │   └── Protocols.cs
    │   │
    │   ├── Enums/
    │   │   └── Role.cs
    │   │
    │   └── NotaryCore.Domain.csproj
    │
    └── NotaryCore.Web/
        ├── src/
        │   ├── api/
        │   │   └── client.ts
        │   ├── components/
        │   │   ├── ActsList.tsx
        │   │   ├── Dashboard.tsx
        │   │   ├── PersonsList.tsx
        │   │   └── ProtocolsList.tsx
        │   ├── types/
        │   │   └── index.ts
        │   ├── App.tsx
        │   ├── index.css
        │   └── main.tsx
        ├── index.html
        ├── package.json
        ├── tsconfig.json
        └── vite.config.ts
```

## How to Run

### Backend (API)
```bash
dotnet run --project src/NotaryCore.Api
```
A API iniciará em `http://localhost:5257`.

### Frontend (Web)
```bash
cd src/NotaryCore.Web
npm run dev
```
O front-end iniciará em `http://localhost:5173`.

## Documentation

Additional documentation is available in the [`/docs`](./docs) directory.
