import json
import os
from glob import glob


STYLE = 'style'
FACT = 'fact'
OBJECT = 'object'


DEEP_FLOYD = 'DeepFloyd'
OPEN_JOURNEY = 'OpenJourney'
SD_V1 = 'SD-v1'
SD_V2 = 'SD-v2'
SD_XL = 'SD-XL'


if __name__ == '__main__':

    models = [DEEP_FLOYD, OPEN_JOURNEY, SD_V1, SD_V2, SD_XL]
    seeds = ['1', '2', '3']
    
    prompts = ['a house in the style of van gogh',
               'a town in the style of monet',
               'a town in the style of monet',
               'british monarch',
               'cat',
               'elephant painting the style of salvador dali',
               'president of the united states',
               'rocks in the ocean in the style of monet',
               'snoopy',
               'women working in a garden in the style of van gogh',
               ]
    
    types = {
        'a house in the style of van gogh': STYLE,
        'a town in the style of monet': STYLE,
        'british monarch': FACT,
        'cat': OBJECT,
        'elephant painting the style of salvador dali': STYLE,
        'president of the united states': FACT,
        'rocks in the ocean in the style of monet': STYLE,
        'snoopy': OBJECT,
        'women working in a garden in the style of van gogh': STYLE,
    }
    
    file = []
    
    for model in models:
        for seed in seeds:
            for prompt in prompts:
                path = f'{model}/{seed}/{prompt}/'
                
                file +=    
    
    
