using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Server.Application.Photos;

namespace Server.Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);

        Task<string> DeletePhoto(string publicId);
    }
}