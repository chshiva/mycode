import { AUDIO_SEND, AUDIO_RECV, VIDEO_SEND, VIDEO_RECV, VIDEO_BWE } from './ConferenceActions';

const initialState = {
  ssrc_audio_send: {bytes_sent: null, packets_sent: null, packets_lost: null, rtt_ms: null, codec_name: null},
  ssrc_audio_recv: {bytes_recv: null, packets_recv: null, packets_lost: null, delay_estimated_ms: null, codec_name: null},
  ssrc_video_send: {bytes_sent: null, packets_sent: null, packets_lost: null, rtt_ms: null, codec_name: null, firs_rcvd: null, nacks_rcvd: null, plis_rcvd: null, send_frame_height: null, send_frame_width: null, framerate_sent: null, last_adapt_reason: null, adapt_changes: null},
  ssrc_video_recv: {bytes_recv: null, packets_recv: null, packets_lost: null, current_delay_ms: null, codec_name: null, firs_sent: null, nacks_rcvd: null, plis_rcvd: null, frame_height: null, frame_width: null, framerate_rcvd: null, framereate_output: null},
  VideoBWE: {available_send_bandwidth: null, available_recv_bandwidth: null, trasmit_bitrate: null, retransmit_bitrate: null},
};
/*
  confStatus: 1 - Presenter, 2 - Conference, 3 - Telepresence
*/

const StatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_SEND: 
      return Object.assign({}, state, {ssrc_audio_send: action.ssrc_audio_send});
    case AUDIO_RECV: 
      return Object.assign({}, state, {ssrc_audio_recv: action.ssrc_audio_recv});
    case VIDEO_SEND: 
      return Object.assign({}, state, {ssrc_video_send: action.ssrc_video_send});
    case VIDEO_RECV:
      return Object.assign({}, state, {ssrc_video_recv: action.ssrc_video_recv});
    case VIDEO_BWE:
      return Object.assign({}, state, {VideoBWE: action.VideoBWE});
    default:
      return state;
  }
};


/* Selectors */

export const statsDetails  = state => state.stats;
// Export Reducer
export default StatsReducer;
