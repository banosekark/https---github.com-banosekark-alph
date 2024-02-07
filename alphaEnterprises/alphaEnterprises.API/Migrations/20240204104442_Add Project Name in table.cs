using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace alphaEnterprises.API.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectNameintable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "PptProjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "PptProjects");
        }
    }
}
