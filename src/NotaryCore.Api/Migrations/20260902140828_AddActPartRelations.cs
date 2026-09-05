using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NotaryCore.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddActPartRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActPart_Acts_ActId",
                table: "ActPart");

            migrationBuilder.DropForeignKey(
                name: "FK_ActPart_Persons_PersonId",
                table: "ActPart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActPart",
                table: "ActPart");

            migrationBuilder.RenameTable(
                name: "ActPart",
                newName: "ActParts");

            migrationBuilder.RenameIndex(
                name: "IX_ActPart_PersonId",
                table: "ActParts",
                newName: "IX_ActParts_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_ActPart_ActId",
                table: "ActParts",
                newName: "IX_ActParts_ActId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActParts",
                table: "ActParts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActParts_Acts_ActId",
                table: "ActParts",
                column: "ActId",
                principalTable: "Acts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActParts_Persons_PersonId",
                table: "ActParts",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActParts_Acts_ActId",
                table: "ActParts");

            migrationBuilder.DropForeignKey(
                name: "FK_ActParts_Persons_PersonId",
                table: "ActParts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActParts",
                table: "ActParts");

            migrationBuilder.RenameTable(
                name: "ActParts",
                newName: "ActPart");

            migrationBuilder.RenameIndex(
                name: "IX_ActParts_PersonId",
                table: "ActPart",
                newName: "IX_ActPart_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_ActParts_ActId",
                table: "ActPart",
                newName: "IX_ActPart_ActId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActPart",
                table: "ActPart",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActPart_Acts_ActId",
                table: "ActPart",
                column: "ActId",
                principalTable: "Acts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActPart_Persons_PersonId",
                table: "ActPart",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
