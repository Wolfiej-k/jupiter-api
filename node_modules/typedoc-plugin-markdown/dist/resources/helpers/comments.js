"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = require("handlebars");
const utils_1 = require("../../utils");
function default_1() {
    Handlebars.registerHelper('comments', function (comment) {
        var _a;
        const md = [];
        if (comment.summary) {
            md.push(Handlebars.helpers.comment(comment.summary));
        }
        if ((_a = comment.blockTags) === null || _a === void 0 ? void 0 : _a.length) {
            const tags = comment.blockTags
                .filter((tag) => tag.tag !== '@returns')
                .map((tag) => `**\`${(0, utils_1.camelToTitleCase)(tag.tag.substring(1))}\`**\n\n${Handlebars.helpers.comment(tag.content)}`);
            md.push(tags.join('\n\n'));
        }
        return md.join('\n\n');
    });
}
exports.default = default_1;
