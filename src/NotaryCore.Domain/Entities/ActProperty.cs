namespace NotaryCore.Domain.Entities;
public class ActProperty
{
    public int Id { get; set; }
    public int ActId { get; set; }
    public int PropertyId { get; set; }
    public Act? Act { get; set; }
    public Property? Property { get; set; }
}