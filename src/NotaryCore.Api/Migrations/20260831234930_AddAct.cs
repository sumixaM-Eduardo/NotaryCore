using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NotaryCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Protocol",
                table: "Protocol");

            migrationBuilder.RenameTable(
                name: "Protocol",
                newName: "Protocols");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Protocols",
                table: "Protocols",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Acts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    OpeningDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Value = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acts", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Acts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Protocols",
                table: "Protocols");

            migrationBuilder.RenameTable(
                name: "Protocols",
                newName: "Protocol");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Protocol",
                table: "Protocol",
                column: "Id");
        }
    }
}
