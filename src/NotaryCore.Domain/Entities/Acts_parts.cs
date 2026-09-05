using NotaryCore.Domain.Enums;
namespace NotaryCore.Domain.Entities;

public class ActPart
{
    public Act? Act { get; set; }
    public int Id { get; set; }
    public int ActId { get; set; }
    public int PersonId { get; set; }
    public Person? Person { get; set; }
    public Role Role { get; set; }

    
}