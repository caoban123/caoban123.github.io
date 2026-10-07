// Research direction from PORTFOLIO_DESIGN.md §18–19.
// Milestones are conceptual stages of the research lineage, not dated achievements.
export const researchData = {
  primaryTopic: 'Adaptive Spatio-Temporal Rectified-Flow Video Editing',
  summary:
    'Exploring adaptive spatio-temporal control for video editing with rectified-flow models — edits that follow the prompt while staying consistent across frames.',
  keywords: ['Video Editing', 'Rectified Flow', 'Diffusion Models', 'Flow Matching', 'Generative AI', 'Computer Vision'],
  milestones: [
    { title: 'Video Generation', description: 'Generative models that synthesize coherent frames over time.' },
    { title: 'Diffusion Editing', description: 'Editing real content by inverting and re-denoising with diffusion models.' },
    { title: 'Flow Matching', description: 'Learning a velocity field that transports noise to data along an ODE.' },
    { title: 'Rectified Flow', description: 'Straightening those trajectories so sampling needs far fewer steps.' },
    { title: 'Video Editing', description: 'Carrying flow-based editing from single images to whole sequences.' },
    { title: 'Adaptive Spatio-Temporal Control', description: 'Current focus — controlling where and when edits apply, frame by frame.', current: true },
  ],
}
