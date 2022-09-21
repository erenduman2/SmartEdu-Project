const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
  },
});

// döküman oluşturmadan önce yapılacak işlemler
// arrow function'larda THIS kullanılMAZ.
CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true, // sadece küçük harflerden oluşmasını sağlar
    strict: true, // içindeki gereksiz karakterleri kaldırır
  });
  next(); // bir sonraki middleware'ye geçmesi için
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
