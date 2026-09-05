namespace NotaryCore.Domain.Entities;
public class Protocol
{
    public int Id { get; set; }
    public DateTime? OpeningDate { get; set; }
    public required string Status { get; set; }
    public List<Act> Acts { get; set; } = [];
}