module.exports = (app) => {
    require('./header/header.Component')(app);
    require('./ghostAnimation/ghostAnimation.Component')(app);
    require('./spinner/spinner.Component')(app);
    require('./coin/coin.Component')(app);
};