namespace Roketka.Services.PasswordHasher
{
    public interface IPasswordHasher
    {
        string GeneratePasswordHash(string password);
    }
}
