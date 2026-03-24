// worker to handle intensive wordlist generation without freezing the main thread
self.onmessage = function (e) {
  const { minLen, maxLen, charset, prefix, suffix } = e.data;

  const chars = charset.split('');
  const chunks: string[] = [];
  let buffer = '';
  let count = 0;
  const CHUNK_SIZE = 10000; // push to chunks array every 10k words
  const REPORT_SIZE = 50000; // report progress every 50k words

  for (let len = minLen; len <= maxLen; len++) {
    const indices = new Array(len).fill(0);

    while (true) {
      // Build word
      let word = prefix;
      for (let i = 0; i < len; i++) {
        word += chars[indices[i]];
      }
      word += suffix;
      
      buffer += word + '\n';
      count++;

      if (count % CHUNK_SIZE === 0) {
        chunks.push(buffer);
        buffer = '';
      }

      if (count % REPORT_SIZE === 0) {
        self.postMessage({ type: 'progress', count, len });
      }

      // Increment indices
      let pos = len - 1;
      while (pos >= 0) {
        indices[pos]++;
        if (indices[pos] < chars.length) break;
        indices[pos] = 0;
        pos--;
      }
      
      // If we ticked past the first index, we are done with this length
      if (pos < 0) {
        break;
      }
    }
  }

  // Push remaining buffer
  if (buffer) {
    chunks.push(buffer);
  }

  // Send final result
  self.postMessage({ type: 'done', chunks, count });
};
