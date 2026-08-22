using NotaryCore.Domain.Enums;
using NotaryCore.Domain.Entities;
namespace NotaryCore.Cli;
public class Program
{
    public static void Main(String[] args)
    {
         Person person = new Person
        {
            Cpf = "09742286566",
            Name = "Maximus",
            Cnpj = null,
            Rg = null,
            Address = "Rua A",
            Nationality = "Brazil",
            DateBirth = null
        };
        Person person2 = new Person
        {
            Cpf = "09742286566",
            Name = "Maria",
            Cnpj = null,
            Rg = null,
            Address = "Rua A",
            Nationality = "Brazil",
            DateBirth = null
        };
        ActPart actPar2t = new ActPart
        {
            Role = Role.Buyer,
            Person = person2
        };
        ActPart actPart = new ActPart
        {
            Role = Role.Seller,
            Person = person
        };
        Act act = new Act
        {
            Type = AcType.purchaseAndSale,
            OpeningDate = null, 
            Value = 250000,
            ActPart = [actPart, actPar2t]
        };
        Protocol protocol = new Protocol
        {
          Id = 12,
          OpeningDate = null,
          Stats = "null",
          Act = act    
        };

       
        foreach (ActPart part in act.ActPart)
        {
            Console.WriteLine($"{part.Person.Name} - {part.Role}");
        }

        
        return;
    }
}