export const getPagination = (req) => {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;

    const MAX_LIMIT = 100;
    page = Math.max(1, page);
    limit = Math.max(1, Math.min(limit, MAX_LIMIT));

    const skip = (page - 1) * limit;
    return { skip, limit, page };
};
