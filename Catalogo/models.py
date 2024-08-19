from django.db import models

class Platform(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Game(models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    release_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    platforms = models.ManyToManyField(Platform)
    image = models.ImageField(upload_to='game_images/', null=True, blank=True)

    def __str__(self):
        return self.title

class Stock(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} of {self.game.title}"
