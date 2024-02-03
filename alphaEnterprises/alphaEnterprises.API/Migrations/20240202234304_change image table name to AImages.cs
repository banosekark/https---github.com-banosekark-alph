using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alphaEnterprises.API.Migrations
{
    /// <inheritdoc />
    public partial class changeimagetablenametoAImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "AImages");

            migrationBuilder.AlterColumn<long>(
                name: "FileSizeInBytes",
                table: "AImages",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AImages",
                table: "AImages",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AImages",
                table: "AImages");

            migrationBuilder.RenameTable(
                name: "AImages",
                newName: "Images");

            migrationBuilder.AlterColumn<string>(
                name: "FileSizeInBytes",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");
        }
    }
}
