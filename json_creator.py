import json
import os
from glob import glob
from urllib.parse import quote

STYLE = 'style'
FACT = 'fact'
OBJECT = 'object'


DEEP_FLOYD = 'DeepFloyd'
OPEN_JOURNEY = 'OpenJourney'
SD_V1 = 'SD-v1'
SD_V2 = 'SD-v2'
SD_XL = 'SD-XL'


def get_hint(prompt, type):
    if type == FACT or type == OBJECT:
        return prompt
    else:
        artists = ['van gogh', 'monet', 'salvador dali']
        for artist in artists:
            if artist in prompt:
                return artist
    
    assert(0)

if __name__ == '__main__':

    models = [OPEN_JOURNEY, SD_V1, SD_V2, SD_XL] # DEEP_FLOYD]
    seeds = ['1', '2', '3']
    
    prompts = ['a house in the style of van gogh',
               'a town in the style of monet',
               'a town in the style of monet',
               'british monarch',
               'cat',
               'elephant painting the style of salvador dali',
               'nemo',
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
        'nemo': OBJECT, 
        'elephant painting the style of salvador dali': STYLE,
        'president of the united states': FACT,
        'rocks in the ocean in the style of monet': STYLE,
        'snoopy': OBJECT,
        'women working in a garden in the style of van gogh': STYLE,
    }
    
    root = 'https://github.com/k1rezaei/model-editing-human-experiment/blob/main'
    file = []
    
    for prompt in prompts:
        for model in models:
            if model == DEEP_FLOYD and prompt == 'nemo':
                continue
            
            for seed in seeds:
                path = f'{model}/{seed}/{prompt}/'
                
                url = f'{root}/{model}/{seed}/{quote(prompt)}'
                original_url = f'{url}/orig.png?raw=true'
                modified_url = f'{url}/modified.png?raw=true'
                
                record = {
                    'original_url': original_url,
                    'modified_url': modified_url,
                    'type': types[prompt],
                    'prompt': prompt,
                    'model': model, 
                    'edit_score': "-1",
                    'hint': get_hint(prompt, types[prompt]),
                }
                
                file.append(record)
                
    
    with open('log.json', 'w') as f:
        f.write(json.dumps(file, indent=4))
