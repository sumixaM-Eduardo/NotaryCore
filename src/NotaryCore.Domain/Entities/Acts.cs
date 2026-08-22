using NotaryCore.Domain.Enums;
namespace NotaryCore.Domain.Entities;
public class Act
{
    public  AcType Type { get; set; }
    public DateTime? OpeningDate { get; set; }
    public decimal Value { get; set; }
    public List<ActPart> ActPart { get; set; } = []; 
}   