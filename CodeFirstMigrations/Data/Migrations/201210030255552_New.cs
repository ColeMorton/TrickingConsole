namespace Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class New : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tricks", "Trick_Id", c => c.Int());
            AlterColumn("dbo.Trickers", "Name", c => c.String());
            AlterColumn("dbo.Tricks", "Name", c => c.String());
            AlterColumn("dbo.TrickersTricks", "Profiency", c => c.Int(nullable: false));
            AddForeignKey("dbo.Tricks", "Trick_Id", "dbo.Tricks", "Id");
            CreateIndex("dbo.Tricks", "Trick_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Tricks", new[] { "Trick_Id" });
            DropForeignKey("dbo.Tricks", "Trick_Id", "dbo.Tricks");
            AlterColumn("dbo.TrickersTricks", "Profiency", c => c.String());
            AlterColumn("dbo.Tricks", "Name", c => c.Int(nullable: false));
            AlterColumn("dbo.Trickers", "Name", c => c.Int(nullable: false));
            DropColumn("dbo.Tricks", "Trick_Id");
        }
    }
}
