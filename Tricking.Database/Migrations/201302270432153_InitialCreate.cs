namespace Tricking.Database.Migrations
{
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Trickers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Power = c.Int(nullable: false),
                        Style = c.Int(nullable: false),
                        Technicality = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TrickProficiencies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Control = c.Int(nullable: false),
                        TrickerId = c.Int(nullable: false),
                        TrickId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Trickers", t => t.TrickerId, cascadeDelete: true)
                .ForeignKey("dbo.Tricks", t => t.TrickId, cascadeDelete: true)
                .Index(t => t.TrickerId)
                .Index(t => t.TrickId);
            
            CreateTable(
                "dbo.Tricks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Abbrev = c.String(),
                        TrickTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TrickTypes", t => t.TrickTypeId, cascadeDelete: true)
                .Index(t => t.TrickTypeId);
            
            CreateTable(
                "dbo.TrickTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TrickTypeProficiencies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Control = c.Int(nullable: false),
                        TrickTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TrickTypes", t => t.TrickTypeId, cascadeDelete: true)
                .Index(t => t.TrickTypeId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TrickTypeProficiencies", new[] { "TrickTypeId" });
            DropIndex("dbo.Tricks", new[] { "TrickTypeId" });
            DropIndex("dbo.TrickProficiencies", new[] { "TrickId" });
            DropIndex("dbo.TrickProficiencies", new[] { "TrickerId" });
            DropForeignKey("dbo.TrickTypeProficiencies", "TrickTypeId", "dbo.TrickTypes");
            DropForeignKey("dbo.Tricks", "TrickTypeId", "dbo.TrickTypes");
            DropForeignKey("dbo.TrickProficiencies", "TrickId", "dbo.Tricks");
            DropForeignKey("dbo.TrickProficiencies", "TrickerId", "dbo.Trickers");
            DropTable("dbo.TrickTypeProficiencies");
            DropTable("dbo.TrickTypes");
            DropTable("dbo.Tricks");
            DropTable("dbo.TrickProficiencies");
            DropTable("dbo.Trickers");
        }
    }
}
