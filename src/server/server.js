import express from 'express';
import DappLib from '../lib/dapp-lib';

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ASSET VALUE TRACKING: TOKEN  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
DappLib.onApproval((result) => {
        console.log(result);
});

DappLib.onTransfer((result) => {
    console.log(result);
});
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FILE STORAGE: SIA  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
DappLib.onAddIpfsDocument((result) => {
        console.log(result);
});


const app = express();
app.get('/api', (req, res) => {
    res.send({
      message: 'An API for My Dapp'
    })
})

export default app;


