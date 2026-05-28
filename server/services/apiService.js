const axios = require('axios');

class ApiService {
  constructor() {
    this.configs = new Map();
  }

  async testConnection(endpoint, apiKey, model) {
    try {
      const response = await axios.post(
        `${endpoint}/chat/completions`,
        {
          model: model || 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: 'Test connection. Reply with "OK".'
            }
          ],
          max_tokens: 10
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      return {
        status: 'connected',
        model: response.data.model || model
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`API 错误: ${error.response.data.error?.message || error.response.statusText}`);
      }
      throw new Error(`连接失败: ${error.message}`);
    }
  }

  async convertImageToLatex(imageBuffer, options = {}) {
    const {
      endpoint,
      apiKey,
      model = 'gpt-4-vision-preview',
      format = 'mixed',
      language = 'auto'
    } = options;

    const base64Image = imageBuffer.toString('base64');
    const mimeType = 'image/png';

    const prompt = this.buildPrompt(format, language);

    try {
      const response = await axios.post(
        `${endpoint}/chat/completions`,
        {
          model: model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 4096
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      const content = response.data.choices[0].message.content;
      return {
        latex: this.extractLatex(content),
        confidence: 0.95,
        rawResponse: content
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`API 错误: ${error.response.data.error?.message || error.response.statusText}`);
      }
      throw new Error(`转换失败: ${error.message}`);
    }
  }

  buildPrompt(format, language) {
    const formatInstructions = {
      math: 'Extract only the mathematical formulas from the image and convert them to LaTeX.',
      text: 'Extract all text content from the image and convert it to LaTeX format.',
      mixed: 'Extract both mathematical formulas and text content from the image and convert them to LaTeX.'
    };

    const languageInstructions = {
      auto: 'Automatically detect the language of the text.',
      en: 'The text is in English.',
      zh: 'The text is in Chinese.'
    };

    return `You are an expert at converting images to LaTeX code.

Task: ${formatInstructions[format] || formatInstructions.mixed}

${languageInstructions[language] || languageInstructions.auto}

Rules:
1. Output ONLY the LaTeX code, no explanations
2. Use proper LaTeX environments (e.g., equation, align, itemize)
3. Preserve the original structure and formatting
4. For inline math, use $...$
5. For display math, use \\[...\\] or equation environments
6. If there are multiple equations, separate them appropriately

LaTeX code:`;
  }

  extractLatex(content) {
    // Try to extract LaTeX from code blocks first
    const codeBlockMatch = content.match(/```(?:latex)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }

    // Otherwise return the content as-is, removing any markdown formatting
    return content
      .replace(/^Here is the LaTeX code:\s*/i, '')
      .replace(/^The LaTeX code is:\s*/i, '')
      .trim();
  }
}

module.exports = new ApiService();
