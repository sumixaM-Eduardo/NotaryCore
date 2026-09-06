namespace NotaryCore.Domain.Entities;

public class Property
{
    public int Id { get; set; }
    public required string RegistrationNumber { get; set; }
    public required string Address { get; set; }
    public decimal? Area { get; set; }
    public string? MunicipalRegistration { get; set; }
    public string? Description { get; set; }
    public List<ActProperty> ActProperties { get; set; } = [];
}
