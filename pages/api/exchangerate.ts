// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next'
import { DELEGATOR_ADDRESS } from '../../constants';
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
            market(id: "${DELEGATOR_ADDRESS.toLowerCase()}") {
              id
              borrowRate
              cash
              collateralFactor
              exchangeRate
            }
          }
          `
        }
      )
      if (result.data.data.market) {
        res.status(200).json(result.data.data.market);
      } else {
        res.status(404).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }
}
