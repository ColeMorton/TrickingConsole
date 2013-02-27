//This project will be used to create and seed the database for use within this solution
//Code first migrations using powershell
//http://msdn.microsoft.com/en-US/data/jj591621

using System.Data.Entity.Migrations;
using Tricking.Database.Migrations;

namespace Tricking.Database
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbMigrator = new DbMigrator(new Configuration());
            dbMigrator.Update(null); 
        }
    }
}
