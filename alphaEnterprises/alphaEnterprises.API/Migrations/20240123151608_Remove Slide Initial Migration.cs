using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alphaEnterprises.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSlideInitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Heading",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "PptProjects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Width",
                table: "PptProjects",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Heading",
                table: "PptProjects");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "PptProjects");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "PptProjects");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "PptProjects");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "PptProjects");
        }
    }
}
