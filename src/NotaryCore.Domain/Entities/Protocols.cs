namespace NotaryCore.Domain.Entities;
public class Protocol
{
    public int Id { get; set; }
    public DateTime? OpeningDate { get; set; }
    public required string Stats { get; set; }
    public Act? Act { get; set; }
}