using NotaryCore.Domain.Enums;

namespace NotaryCore.Domain.Entities;

public class Act
{
    public int Id { get; set; }
    public int ProtocolId { get; set; }
    public AcType Type { get; set; }
    public DateTime? OpeningDate { get; set; }
    public decimal Value { get; set; }
    public Protocol? Protocol { get; set; }
    public List<ActPart> ActParts { get; set; } = [];
    public List<ActProperty> ActProperties { get; set; } = [];
}