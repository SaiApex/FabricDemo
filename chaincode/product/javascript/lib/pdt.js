
'use strict';
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { Contract, Context } = require('fabric-contract-api');


class Product extends Contract {

  async helloWorld(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    const users = [
        {
            name: 'Prashant Parashar',
            role: 'Technical Leader',
            id:'1'
        },
        {
            name: 'Gaurav Gupta',
            role: 'Global Director',
            id:'2'
        },
        {
          name: 'Gautham Gupta',
          role: 'Technical head',
          id:'3'
        },
        {
          name: 'TS Mohan',
          role: 'Global HR',
          id:'4'
        },  
        {
        name: 'Saeed',
        role: 'Technical head',
        id:'5'
        },
        {
          name: 'Shivam',
          role: 'Technical/Marketing',
          id:'6'
        }
    ];

    for (let i = 0; i < users.length; i++) {
        users[i].docType = 'user';
        await ctx.stub.putState('HI USER' + i , Buffer.from(JSON.stringify(users[i])));
        console.info('Added <--> ', users[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
}
async endorseTran(ctx, _key, _payload) {
    console.info('============= START : Endorse Transaction proposal===========');
    await ctx.stub.putState(_key, JSON.stringify(_payload));
    console.info('============= END : Endorse Transaction proposal ===========');
}
async queryTran(ctx, productId) {
    const pdtAsBytes = await ctx.stub.getState(productId); // get the pdt from chaincode state
    if (!pdtAsBytes || pdtAsBytes.length === 0) {
        throw new Error(`Transaction does not exist`);
    }
    console.log(pdtAsBytes.toString());
    let res = JSON.parse(Buffer.from(pdtAsBytes).toString('utf8'));
    return JSON.stringify(res);
}

}

module.exports = Product;



