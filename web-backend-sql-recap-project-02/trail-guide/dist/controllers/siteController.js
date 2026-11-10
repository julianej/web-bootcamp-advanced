import * as regionModel from '../models/regionModel.js';
import * as trailModel from '../models/trailModel.js';
// URL params are strings, so convert and validate them first
function parseId(value) {
    if (typeof value !== 'string') {
        return null;
    }
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}
// HOME
export function home(_req, res) {
    const trails = trailModel.getAllWithRegion();
    console.log('Homepage trails:', trails);
    res.render('site/home.njk', {
        title: 'Trail Guide',
        trails,
    });
}
// TRAIL LIST
export function trailList(_req, res) {
    res.render('site/trails', {
        trails: trailModel.getAllWithRegion(),
    });
}
// TRAIL DETAIL
export function trailDetail(req, res) {
    const id = parseId(req.params.id);
    function notFound(res) {
        res.status(404).render('errors/404');
    }
    const trail = id === null ? undefined : trailModel.getById(id);
    if (!trail) {
        notFound(res);
        return;
    }
    res.render('site/trail', { trail });
}
// REGION DETAIL
export function regionDetail(req, res) {
    const id = parseId(req.params.id);
    function notFound(res) {
        res.status(404).render('errors/404');
    }
    const region = id === null ? undefined : regionModel.getById(id);
    if (!region) {
        notFound(res);
        return;
    }
    res.render('site/region', {
        region,
        trails: trailModel.getByRegion(region.id),
    });
}
//# sourceMappingURL=siteController.js.map