using NotaryCore.Domain.Enums;
namespace NotaryCore.Domain.Entities;

public class ActPart
{
    public required Person Person { get; set; }
    public required Role Role { get; set; }
}