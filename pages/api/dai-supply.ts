// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next'
import { CDAI_ADDRESS } from '../../constants';
type Data = {
  name: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { method } = req

  if (method === "GET") {

    const { address } = req.query
    try {
      const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/macharry89/cdai-kovan-subgraph',
        {
          query: `
          {
            accountCToken(id: "${address}-${CDAI_ADDRESS}") {
              id
              market {
                supplyRate
              }
              symbol
              cTokenBalance
            }
          }
          `
        }
      )
      res.status(200).json(result.data);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
