using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NotaryCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProtocolActRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProtocolId",
                table: "Acts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ActPart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ActId = table.Column<int>(type: "integer", nullable: false),
                    PersonId = table.Column<int>(type: "integer", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActPart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActPart_Acts_ActId",
                        column: x => x.ActId,
                        principalTable: "Acts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActPart_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Acts_ProtocolId",
                table: "Acts",
                column: "ProtocolId");

            migrationBuilder.CreateIndex(
                name: "IX_ActPart_ActId",
                table: "ActPart",
                column: "ActId");

            migrationBuilder.CreateIndex(
                name: "IX_ActPart_PersonId",
                table: "ActPart",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Acts_Protocols_ProtocolId",
                table: "Acts",
                column: "ProtocolId",
                principalTable: "Protocols",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Acts_Protocols_ProtocolId",
                table: "Acts");

            migrationBuilder.DropTable(
                name: "ActPart");

            migrationBuilder.DropIndex(
                name: "IX_Acts_ProtocolId",
                table: "Acts");

            migrationBuilder.DropColumn(
                name: "ProtocolId",
                table: "Acts");
        }
    }
}
