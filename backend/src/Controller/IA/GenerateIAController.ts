import axios from 'axios';
import type { FastifyReply, FastifyRequest } from 'fastify';

class GenerateIAController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { text } = request.body as { text: string };

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma3',
        prompt: `Ollama, tudo bem? Eu quero te pedir um favor: Eu desejo que você melhore a seguinte frase e acrescente mais detalhes de uma forma resumida: "${text}".
      Eu não quero que em sua resposta contenha mais nenhuma outra palavra que seja além da frase que você melhorou.
      Nem uma apresentação do tipo: "aqui está a frase que você solicitou", ou algo do tipo...
      consegue compreender? Eu quero uma resposta direta. Somente a resposta final. Nada a mais!`,
        stream: false,
      });

      reply.send(response.data.response);
      // biome-ignore lint/correctness/noUnusedVariables: error is handled in catch block
    } catch (error) {
      reply.status(500).send({ message: 'Erro ao processar sua solicitação' });
    }
  }
}

export { GenerateIAController };
