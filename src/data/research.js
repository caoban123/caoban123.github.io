// Định hướng nghiên cứu từ PORTFOLIO_DESIGN.md
export const researchData = {
  primaryTopic: 'Adaptive Spatio-Temporal Rectified-Flow Video Editing',
  summary:
    'Nghiên cứu cơ chế kiểm soát không - thời gian thích ứng (adaptive spatio-temporal control) cho việc chỉnh sửa video bằng các mô hình Rectified Flow — tạo ra các chỉnh sửa bám sát câu lệnh (prompt) nhưng vẫn duy trì tính nhất quán quang học mượt mà qua các khung hình liên tiếp.',
  keywords: ['Video Editing', 'Rectified Flow', 'Diffusion Models', 'Flow Matching', 'Generative AI', 'Computer Vision'],
  milestones: [
    {
      title: 'Video Generation',
      description: 'Các mô hình sinh tổng hợp chuỗi khung hình liên tục và nhất quán theo thời gian.',
    },
    {
      title: 'Diffusion Editing',
      description: 'Chỉnh sửa nội dung thực bằng cơ chế nghịch đảo (inversion) và tái khử nhiễu với các mô hình khuếch tán.',
    },
    {
      title: 'Flow Matching',
      description: 'Học trường vận tốc (velocity field) dịch chuyển từ phân phối nhiễu sang phân phối dữ liệu qua phương trình vi phân thông thường (ODE).',
    },
    {
      title: 'Rectified Flow',
      description: 'Làm thẳng quỹ đạo dịch chuyển (trajectory straightening) giúp quá trình lấy mẫu Euler giảm thiểu tối đa số bước tính toán (NFE).',
    },
    {
      title: 'Video Editing',
      description: 'Mở rộng cơ chế chỉnh sửa dựa trên dòng chảy từ ảnh đơn sang chuỗi video hoàn chỉnh.',
    },
    {
      title: 'Adaptive Spatio-Temporal Control',
      description: 'Trọng tâm hiện tại — điều khiển chính xác vị trí và thời điểm các chỉnh sửa diễn ra, tối ưu hóa từng khung hình mà không làm biến dạng thực thể gốc.',
      current: true,
    },
  ],
}
