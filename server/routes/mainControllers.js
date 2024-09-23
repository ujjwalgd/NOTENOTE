/* GET Homepage */

exports.homepage = async (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        const locals = {
            title: 'NOTENOTE | HomePage',
            description: 'Free notes app'
        }

        res.render('index', locals);
    }

}

exports.about = async (req, res) => {
    const locals = {
        title: 'ANOTENOTE | HomePage',
        description: 'AFree notes app'
    }

    res.render('about', locals);
}

exports.coko = async (req, res) => {
    const locals = {
        title: 'ANOTENOTE | HomePage',
        description: 'AFree notes app'
    }

    res.render('coko', locals);
}

