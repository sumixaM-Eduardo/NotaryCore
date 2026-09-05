namespace NotaryCore.Domain.Entities;
public class Person
{
    public List<ActPart> ActParts { get; set; } = [];
    public int Id { get; set; }
    public required string Cpf { get; set; }
    public required string Name { get; set; }
    public string? Cnpj { get; set; }
    public string? Rg { get; set; }
    public required string Nationality { get; set; }
    public DateTime? DateBirth { get; set; }
    public required string Address { get; set; }
}