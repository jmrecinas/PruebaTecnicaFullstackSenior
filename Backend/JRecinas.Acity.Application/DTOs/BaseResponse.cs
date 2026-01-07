namespace JRecinas.Acity.Application.DTOs
{
    public class BaseResponse<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Result { get; set; }
        public IEnumerable<string>? Errors { get; set; }

        public static BaseResponse<T> Success(T data, string message = "Operación exitosa")
        {
            return new BaseResponse<T> { IsSuccess = true, Result = data, Message = message };
        }

        public static BaseResponse<T> Failure(string message, IEnumerable<string>? errors = null)
        {
            return new BaseResponse<T> { IsSuccess = false, Message = message, Errors = errors };
        }
    }
}