from rest_framework import serializers
from .models import Platform, Game, Stock

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)
    platform_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Platform.objects.all(), source='platforms', write_only=True
    )
    formatted_id = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'formatted_id', 'title', 'genre', 'release_date', 'price', 'platforms', 'platform_ids', 'image']
    
    def get_formatted_id(self,obj):
        return f"{obj.id:04d}"

class StockSerializer(serializers.ModelSerializer):
    game_id = serializers.PrimaryKeyRelatedField(
        queryset=Game.objects.all(),
        source='game',
        write_only=True
    )
    game_title = serializers.CharField(source='game.title', read_only=True)
    game_image = serializers.ImageField(source='game.image', read_only=True)

    class Meta:
        model = Stock
        fields = ['id', 'game_id', 'game_title','game_image', 'quantity']