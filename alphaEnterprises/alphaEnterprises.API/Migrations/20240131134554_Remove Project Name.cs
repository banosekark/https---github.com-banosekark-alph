using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alphaEnterprises.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProjectName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "PptProjects");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
