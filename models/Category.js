const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

// döküman oluşturmadan önce yapılacak işlemler
// arrow function'larda THIS kullanılMAZ.
CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true, // sadece küçük harflerden oluşmasını sağlar
    strict: true, // içindeki gereksiz karakterleri kaldırır
  });
  next(); // bir sonraki middleware'ye geçmesi için
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
